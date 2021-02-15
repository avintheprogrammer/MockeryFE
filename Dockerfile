# Official Centos Base Image (https://hub.docker.com/_/centos/)

FROM centos:centos7

ENV       S3_AWS_BUCKET           https://s3.amazonaws.com/mockery-devops
ARG       SPLUNK_FORWARDER
ARG       APP_NAME


# Create Non-Root User
RUN useradd --user-group --create-home --shell /bin/false mockery

#Install rpms
  COPY config/epel.repo /etc/yum.repos.d/epel.repo
  COPY config/RPM-GPG-KEY-EPEL-7  /etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-7
  RUN yum -y install glibc.i686 libstdc++ libstdc++.so.6 wget
  RUN yum -y install bzip2 fontconfig git vim curl 
  RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash - \
   && yum -y install nodejs
  RUN node -v
  RUN echo "license_key: $NEWRELIC_LICENSE_KEY"  >> /etc/newrelic-infra.yml


# Create App Directory
RUN mkdir phoenix
WORKDIR /phoenix
COPY . /phoenix

# Install Dependencies
RUN npm install --no-optional

# Run Test Suite
# RUN npm run test -- -u

# Run Build
ARG BUILD_ENV=production
RUN NODE_ENV=$BUILD_ENV npm run build

# Open Port(s)
EXPOSE 3000

# Install and configure Splunk Forwarder
RUN cd /etc/yum.repos.d/ \
    && wget "${S3_AWS_BUCKET}/applications/stage/mockery-epel.repo"

RUN yum install -y splunkforwarder
RUN yum install -y newrelic-infra

RUN chown splunk.splunk -R /opt/splunkforwarder

RUN /opt/splunkforwarder/bin/splunk enable boot-start --answer-yes --no-prompt --accept-license


COPY config/splunk-inputs.conf /opt/splunkforwarder/etc/system/local/inputs.conf
COPY config/splunk-outputs.conf /opt/splunkforwarder/etc/system/local/outputs.conf
COPY scripts/start.sh /opt/start.sh

RUN chmod 775 /opt/start.sh

RUN sed -i "s/{{APP_NAME}}/${APP_NAME}/g" /opt/splunkforwarder/etc/system/local/inputs.conf
RUN sed -i "s/{{SPLUNK_FORWARDER}}/${SPLUNK_FORWARDER}/g" /opt/splunkforwarder/etc/system/local/outputs.conf


# Store log files in an anonymous volume.
VOLUME /phoenix/log

# Docker Run Entry
CMD  ["/opt/start.sh"]
