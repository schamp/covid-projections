import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import PageContent from 'components/PageContent';
import { Heading2, MarkdownContent } from 'components/Markdown';
import { formatMetatagDate } from 'common/utils';
import { LearnHeading1 } from '../Learn/Learn.style';
import {
  productsLandingContent,
  ProductsLandingSection,
} from 'cms-content/learn/data-api';
import {
  MarkdownDataApi,
  DataApiSection,
  GreenLinkButton,
  BlueLinkButton,
} from './DataApi.style';
import { TocItem } from 'cms-content/utils';
import AvailabilityTable, {
  AVAILABILITY_SNAPSHOT,
  FIELDS_PRETTY_NAMES,
} from './AvailabilityTable';
import LogoGrid from 'components/LogoGrid/LogoGrid';
import { EventCategory } from 'components/Analytics';
import ExternalLink from 'components/ExternalLink';
import LinkButton from 'components/LinkButton';
import { Grid } from '@material-ui/core';

const {
  header,
  intro,
  productsList,
  metadataTitle,
  metadataDescription,
} = productsLandingContent;

export const sidebarSections: TocItem[] = [
  {
    label: 'Data API',
    to: '/data-api',
    items: productsList.map(product => ({
      to: `/data-api#${product.productId}`,
      label: product.productName,
    })),
  },
];

const DataCoverageSection: React.FC<{}> = ({}) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <AvailabilityTable rows={FIELDS_PRETTY_NAMES} />
      </Grid>
      <Grid item xs={12}>
        <BlueLinkButton
          trackingCategory={EventCategory.API}
          trackingLabel="Data API: View all metrics"
          href="https://apidocs.covidactnow.org/data-definitions"
        >
          View more metrics
        </BlueLinkButton>
      </Grid>
    </Grid>
  );
};

const DataApi = () => {
  const date = formatMetatagDate();
  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/data-api"
        pageTitle={metadataTitle}
        pageDescription={`${date} ${metadataDescription}`}
      />
      <PageContent sidebarItems={sidebarSections}>
        <LearnHeading1>{header}</LearnHeading1>
        <MarkdownContent source={intro} />
        <GreenLinkButton
          trackingCategory={EventCategory.API}
          trackingLabel="Data API: Register"
          href="https://apidocs.covidactnow.org/access/"
        >
          Register
        </GreenLinkButton>
        {productsList.map((product: ProductsLandingSection) => (
          <DataApiSection key={product.productId}>
            <Heading2 id={product.productId}>{product.productName}</Heading2>
            <MarkdownDataApi source={product.productDescription} />
            {product.productId === 'coverage' && <DataCoverageSection />}
            {product.logos && <LogoGrid logos={product.logos} />}
          </DataApiSection>
        ))}
      </PageContent>
    </Fragment>
  );
};

export default DataApi;
