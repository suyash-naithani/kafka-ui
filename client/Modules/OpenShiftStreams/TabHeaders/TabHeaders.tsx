import React, { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Flex,
  FlexItem,
  PageSection,
  PageSectionVariants,
  Title,
  Tabs,
  Tab,
  TabTitleText,
} from '@patternfly/react-core';
import { TopicsListComponent } from '../../Topics/TopicList/Components/TopicsList';
import './TabHeaders.css';
import CodeBranchIcon from '@patternfly/react-icons/dist/js/icons/code-branch-icon';
import { useHistory } from 'react-router';
interface ITabHeaderProps {
  eventKey: number;
}
export const TabHeaders: React.FunctionComponent<ITabHeaderProps> = ({
  eventKey,
}) => {
  const [activeTabKey, setActiveTabKey] = useState(eventKey);
  const handleTabClick = (event, tabIndex) => {
    setActiveTabKey(tabIndex);
  };
  const history = useHistory();

  const onCreateTopic = () => {
    history.push('/topics/create');
  };

  const mainBreadcrumbs = (
    <Breadcrumb>
      <BreadcrumbItem to='#'>OpenShift Streams</BreadcrumbItem>
      <BreadcrumbItem to='#' isActive>
        MK Cluster Instance
      </BreadcrumbItem>
    </Breadcrumb>
  );

  return (
    <PageSection
      className='page-section-padding'
      variant={PageSectionVariants.light}
    >
      <section>{mainBreadcrumbs}</section>
      <PageSection variant={PageSectionVariants.light}>
        <Flex>
          <FlexItem align={{ default: 'alignRight' }}>
            <Button
              variant='link'
              icon={<CodeBranchIcon />}
              iconPosition='right'
            >
              Connect to this cluster
            </Button>
          </FlexItem>
        </Flex>
        <Title headingLevel='h1'>MK Cluster Instance</Title>
      </PageSection>
      <br />
      <PageSection
        variant={PageSectionVariants.light}
        padding={{ default: 'noPadding' }}
      >
        <Tabs activeKey={activeTabKey} onSelect={handleTabClick}>
          <Tab
            title={<TabTitleText>Home</TabTitleText>}
            eventKey={0}
            id='home-tab-section'
            aria-label='Home Tab'
            hidden
          >
            <Title headingLevel='h4'>Home </Title>
          </Tab>
          <Tab
            title={<TabTitleText>Topics</TabTitleText>}
            eventKey={1}
            id='topics-tab-section'
            aria-label='Topics Tab'
          >
            <TopicsListComponent onCreateTopic={onCreateTopic} />
          </Tab>
          <Tab
            title={<TabTitleText>Consumer Groups</TabTitleText>}
            eventKey={2}
            id='consumer-groups-tab-section'
            aria-label='Consumer Groups Tab'
          >
            <Title headingLevel='h4'>Consumer Groups</Title>
          </Tab>
          <Tab
            title={<TabTitleText>Metrics</TabTitleText>}
            eventKey={3}
            id='metrics-tab-section'
            aria-label='Metrics Tab'
          >
            <Title headingLevel='h4'>Metrics </Title>
          </Tab>
        </Tabs>
      </PageSection>
    </PageSection>
  );
};