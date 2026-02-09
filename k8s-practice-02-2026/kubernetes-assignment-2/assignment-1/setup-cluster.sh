#!/bin/bash
eksctl create cluster --name dev-cluster --region us-east-1 --nodegroup-name dev-nodes --node-type t3.medium --nodes 3 --nodes-min 2 --nodes-max 5 --managed

# change local kubernetes configuration to EKS
aws eks --region us-east-1 update-kubeconfig --name dev-cluster