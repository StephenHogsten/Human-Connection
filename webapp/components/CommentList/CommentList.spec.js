import { config, mount, createLocalVue } from '@vue/test-utils'
import CommentList from './CommentList'
import Vuex from 'vuex'
import Styleguide from '@human-connection/styleguide'
import Filters from '~/plugins/vue-filters'

const localVue = createLocalVue()

localVue.use(Styleguide)
localVue.use(Vuex)
localVue.use(Filters)
localVue.filter('truncate', string => string)

config.stubs['v-popover'] = '<span><slot /></span>'
config.stubs['nuxt-link'] = '<span><slot /></span>'
config.stubs['client-only'] = '<span><slot /></span>'

describe('CommentList.vue', () => {
  let mocks, store, wrapper, propsData, stubs

  describe('mount', () => {
    beforeEach(() => {
      propsData = {
        post: {
          id: 1,
          comments: [
            { id: 'comment134', contentExcerpt: 'this is a comment', content: 'this is a comment' },
          ],
        },
      }
      store = new Vuex.Store({
        getters: {
          'auth/isModerator': () => false,
          'auth/user': () => {
            return {}
          },
        },
      })
      mocks = {
        $t: jest.fn(),
        $filters: {
          truncate: a => a,
          removeHtml: a => a,
        },
        $scrollTo: jest.fn(),
        $apollo: {
          queries: {
            Post: {
              refetch: jest.fn(),
            },
          },
        },
      }
      stubs = {
        EditorContent: "<div class='stub'></div>",
      }
    })

    const Wrapper = () => {
      return mount(CommentList, {
        store,
        mocks,
        localVue,
        propsData,
        stubs,
      })
    }

    it('displays a comments counter', () => {
      wrapper = Wrapper()
      expect(wrapper.find('span.ds-tag').text()).toEqual('1')
    })

    it('displays a comments counter', () => {
      wrapper = Wrapper()
      expect(wrapper.find('span.ds-tag').text()).toEqual('1')
    })

    describe('scrollToAnchor mixin', () => {
      beforeEach(jest.useFakeTimers)

      describe('$route.hash !== `#comments`', () => {
        beforeEach(() => {
          mocks.$route = {
            hash: '',
          }
        })

        it('skips $scrollTo', () => {
          wrapper = Wrapper()
          jest.runAllTimers()
          expect(mocks.$scrollTo).not.toHaveBeenCalled()
        })
      })

      describe('$route.hash === `#comments`', () => {
        beforeEach(() => {
          mocks.$route = {
            hash: '#comments',
          }
        })

        it('calls $scrollTo', () => {
          wrapper = Wrapper()
          jest.runAllTimers()
          expect(mocks.$scrollTo).toHaveBeenCalledWith('#comments')
        })
      })
    })
  })
})
