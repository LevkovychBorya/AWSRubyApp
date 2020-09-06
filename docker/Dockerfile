FROM centos:7

# Install ruby version 2.2.10

RUN yum update -y && yum install postgresql-devel ImageMagick-devel which net-tools -y
RUN command curl -sSL https://rvm.io/pkuczynski.asc | gpg2 --import
RUN curl -L get.rvm.io | bash -s stable
RUN source /etc/profile.d/rvm.sh
RUN /bin/bash -l -c "rvm reload && rvm requirements run && rvm install 2.2.10"

# Install terraform

RUN yum install wget unzip -y
RUN wget https://releases.hashicorp.com/terraform/0.13.2/terraform_0.13.2_linux_amd64.zip
RUN unzip terraform_0.13.2_linux_amd64.zip
RUN mv terraform /bin/
RUN rm terraform_0.13.2_linux_amd64.zip

# Commands to run

ENTRYPOINT ["/bin/bash", "-l", "-c"]
