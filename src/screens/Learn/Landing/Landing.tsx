import React, { Fragment } from 'react';
import { formatMetatagDate } from 'common/utils';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import { Heading1, Heading2, MarkdownContent } from 'components/Markdown';
import PageContent from 'components/PageContent';
import { LandingSection, landingPageContent } from 'cms-content/learn/landing';
import { learnPages } from 'cms-content/learn';
import SectionButton, { ButtonTheme } from './SectionButton';
import { ButtonContainer } from '../Learn.style';

const Landing: React.FC = () => {
  const {
    header,
    intro,
    sections,
    metadataTitle,
    metadataDescription,
  } = landingPageContent;

  const date = formatMetatagDate();

  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/learn"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent sidebarItems={learnPages}>
        <Heading1>{header}</Heading1>
        <MarkdownContent source={intro} />
        {sections.map((section: LandingSection) => (
          <Fragment key={section.sectionId}>
            <Heading2 id={section.sectionId}>{section.sectionTitle}</Heading2>
            <MarkdownContent source={section.description} />
            <ButtonContainer>
              <SectionButton
                cta={section.buttonCta}
                redirect={section.buttonRedirect}
                theme={ButtonTheme.WHITE}
              />
            </ButtonContainer>
          </Fragment>
        ))}
      </PageContent>
    </Fragment>
  );
};

export default Landing;
