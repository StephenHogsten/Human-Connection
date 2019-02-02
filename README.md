# Human-Connection Nitro | Deployment Configuration

Todos:
- [x] check labels and selectors if they all are correct
- [x] configure NGINX from yml
- [ ] configure Let's Encrypt cert-manager from yml
- [x] configure ingress from yml
- [x] configure persistent & shared storage between nodes
- [x] reproduce setup locally

## Minikube
There are many Kubernetes distributions, but if you're just getting started,
Minikube is a tool that you can use to get your feet wet.

[Install Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)

Open minikube dashboard:
```
$ minikube dashboard
```
This will give you an overview.
Some of the steps below need some timing to make ressources available to other
dependent deployments. Keeping an eye on the dashboard is a great way to check
that.

Follow the [installation instruction](#installation-with-kubernetes) below.
If all the pods and services have settled and everything looks green in your
minikube dashboard, expose the `nitro-web` service on your host system with:

```shell
$ minikube service nitro-web --namespace=staging
```

## Digital Ocean

First, install kubernetes dashboard:
```sh
$ kubectl apply -f dashboard/
```
Proxy localhost to the remote kubernetes dashboard:
```sh
kubectl proxy
```
Get your token on the command line:
```sh
$ kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')
```
It should print something like:
```
Name:         admin-user-token-6gl6l
Namespace:    kube-system
Labels:       <none>
Annotations:  kubernetes.io/service-account.name=admin-user
              kubernetes.io/service-account.uid=b16afba9-dfec-11e7-bbb9-901b0e532516

Type:  kubernetes.io/service-account-token

Data
====
ca.crt:     1025 bytes
namespace:  11 bytes
token:      eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLTZnbDZsIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiJiMTZhZmJhOS1kZmVjLTExZTctYmJiOS05MDFiMGU1MzI1MTYiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06YWRtaW4tdXNlciJ9.M70CU3lbu3PP4OjhFms8PVL5pQKj-jj4RNSLA4YmQfTXpPUuxqXjiTf094_Rzr0fgN_IVX6gC4fiNUL5ynx9KU-lkPfk0HnX8scxfJNzypL039mpGt0bbe1IXKSIRaq_9VW59Xz-yBUhycYcKPO9RM2Qa1Ax29nqNVko4vLn1_1wPqJ6XSq3GYI8anTzV8Fku4jasUwjrws6Cn6_sPEGmL54sq5R4Z5afUtv-mItTmqZZdxnkRqcJLlg2Y8WbCPogErbsaCDJoABQ7ppaqHetwfM_0yMun6ABOQbIwwl8pspJhpplKwyo700OSpvTT9zlBsu-b35lzXGBRHzv5g_RA

```
Grab the token and paste it into the login screen at [http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/](http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/)


## Installation with kubernetes

You have to do some prerequisites e.g. change some secrets according to your
own setup.

#### Setup config maps
```shell
$ cp configmap-db-migration-worker.template.yaml staging/configmap-db-migration-worker.yaml
```
Edit all variables according to the setup of the remote legacy server.

#### Setup secrets and deploy themn

```sh
$ cp secrets.template.yaml staging/secrets.yaml
```
Change all secrets as needed.

If you want to edit secrets, you have to `base64` encode them. See [kubernetes
documentation](https://kubernetes.io/docs/concepts/configuration/secret/#creating-a-secret-manually).
```shell
# example how to base64 a string:
$ echo -n 'admin' | base64
YWRtaW4=
```
Those secrets get `base64` decoded in a kubernetes pod.

#### Create a namespace locally
```shell
$ kubectl create -f namespace-staging.yaml
```
Switch to the namespace `staging` in your kubernetes dashboard.

### Run the configuration
```shell
$ kubectl apply -f staging/
```

This can take a while because kubernetes will download the docker images.
Sit back and relax and have a look into your kubernetes dashboard.
Wait until all pods turn green and they don't show a warning
`Waiting: ContainerCreating` anymore.


### Provision db-migration-worker
Copy your private ssh key and the `.known-hosts` file of your remote legacy
server.
```shell

# check the corresponding db-migration-worker pod
$ kubectl --namespace=staging get pods
# change <POD_ID> below
$ kubectl cp path/to/your/ssh/keys/.ssh staging/nitro-db-migration-worker-<POD_ID>:/root/
```

Run the migration:
```shell
# change <POD_IDs> below
$ kubectl --namespace=staging exec -it nitro-db-migration-worker-<POD_ID> ./import.sh
$ kubectl --namespace=staging exec -it nitro-neo4j-<POD_ID>               ./import/import.sh
```
