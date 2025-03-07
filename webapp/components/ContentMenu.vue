<template>
  <dropdown class="content-menu" :placement="placement" offset="5">
    <template slot="default" slot-scope="{ toggleMenu }">
      <slot name="button" :toggleMenu="toggleMenu">
        <ds-button class="content-menu-trigger" size="small" ghost @click.prevent="toggleMenu">
          <ds-icon name="ellipsis-v" />
        </ds-button>
      </slot>
    </template>
    <div slot="popover" slot-scope="{ toggleMenu }" class="content-menu-popover">
      <ds-menu :routes="routes">
        <ds-menu-item
          slot="menuitem"
          slot-scope="item"
          :route="item.route"
          :parents="item.parents"
          @click.stop.prevent="openItem(item.route, toggleMenu)"
        >
          <ds-icon :name="item.route.icon" />
          {{ item.route.name }}
        </ds-menu-item>
      </ds-menu>
    </div>
  </dropdown>
</template>

<script>
import Dropdown from '~/components/Dropdown'

export default {
  name: 'ContentMenu',
  components: {
    Dropdown,
  },
  props: {
    placement: { type: String, default: 'top-end' },
    resource: { type: Object, required: true },
    isOwner: { type: Boolean, default: false },
    resourceType: {
      type: String,
      required: true,
      validator: value => {
        return value.match(/(contribution|comment|organization|user)/)
      },
    },
    modalsData: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    routes() {
      let routes = []

      if (this.resourceType === 'contribution') {
        if (this.isOwner) {
          routes.push({
            name: this.$t(`post.menu.edit`),
            path: this.$router.resolve({
              name: 'post-edit-id',
              params: {
                id: this.resource.id,
              },
            }).href,
            icon: 'edit',
          })
          routes.push({
            name: this.$t(`post.menu.delete`),
            callback: () => {
              this.openModal('delete')
            },
            icon: 'trash',
          })
        }

        if (this.isAdmin) {
          if (!this.resource.pinnedBy) {
            routes.push({
              name: this.$t(`post.menu.pin`),
              callback: () => {
                this.$emit('pinPost', this.resource)
              },
              icon: 'link',
            })
          } else {
            routes.push({
              name: this.$t(`post.menu.unpin`),
              callback: () => {
                this.$emit('unpinPost', this.resource)
              },
              icon: 'unlink',
            })
          }
        }
      }

      if (this.isOwner && this.resourceType === 'comment') {
        routes.push({
          name: this.$t(`comment.menu.edit`),
          callback: () => {
            this.$emit('showEditCommentMenu', true)
          },
          icon: 'edit',
        })
        routes.push({
          name: this.$t(`comment.menu.delete`),
          callback: () => {
            this.openModal('delete')
          },
          icon: 'trash',
        })
      }

      if (!this.isOwner) {
        routes.push({
          name: this.$t(`report.${this.resourceType}.title`),
          callback: () => {
            this.openModal('report')
          },
          icon: 'flag',
        })
      }

      if (!this.isOwner && this.isModerator) {
        if (!this.resource.disabled) {
          routes.push({
            name: this.$t(`disable.${this.resourceType}.title`),
            callback: () => {
              this.openModal('disable')
            },
            icon: 'eye-slash',
          })
        } else {
          routes.push({
            name: this.$t(`release.${this.resourceType}.title`),
            callback: () => {
              this.openModal('release', this.resource.id)
            },
            icon: 'eye',
          })
        }
      }

      if (this.resourceType === 'user') {
        if (this.isOwner) {
          routes.push({
            name: this.$t(`settings.name`),
            path: '/settings',
            icon: 'edit',
          })
        } else {
          if (this.resource.isBlocked) {
            routes.push({
              name: this.$t(`settings.blocked-users.unblock`),
              callback: () => {
                this.$emit('unblock', this.resource)
              },
              icon: 'user-plus',
            })
          } else {
            routes.push({
              name: this.$t(`settings.blocked-users.block`),
              callback: () => {
                this.$emit('block', this.resource)
              },
              icon: 'user-times',
            })
          }
        }
      }

      return routes
    },
    isModerator() {
      return this.$store.getters['auth/isModerator']
    },
    isAdmin() {
      return this.$store.getters['auth/isAdmin']
    },
  },
  methods: {
    openItem(route, toggleMenu) {
      if (route.callback) {
        route.callback()
      } else {
        this.$router.push(route.path)
      }
      toggleMenu()
    },
    openModal(dialog) {
      this.$store.commit('modal/SET_OPEN', {
        name: dialog,
        data: {
          type: this.resourceType,
          resource: this.resource,
          modalsData: this.modalsData,
        },
      })
    },
  },
}
</script>

<style lang="scss">
.content-menu-popover {
  nav {
    margin-top: -$space-xx-small;
    margin-bottom: -$space-xx-small;
    margin-left: -$space-x-small;
    margin-right: -$space-x-small;
  }
}
</style>
