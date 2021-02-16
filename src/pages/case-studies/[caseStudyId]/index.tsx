import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import CaseStudyPage, {
  CaseStudyProps,
} from 'screens/Learn/CaseStudies/CaseStudy';
import {
  CaseStudy as CaseStudyType,
  allCaseStudies,
  caseStudiesById,
  getCaseStudyCategory,
  getMoreStudies,
} from 'cms-content/learn';

const getStaticPaths: GetStaticPaths = async () => {
  const pathParams = allCaseStudies.map((caseStudy: CaseStudyType) => {
    return {
      params: {
        caseStudyId: caseStudy.caseStudyId,
      },
    };
  });
  return {
    paths: pathParams,
    fallback: false,
  };
};

const getStaticProps: GetStaticProps = async ({ params }) => {
  const caseStudyId = (params?.caseStudyId ?? '') as string;
  const caseStudy = caseStudyId ? caseStudiesById[caseStudyId] : null;

  if (!caseStudy) {
    return {
      notFound: true,
    };
  }

  const studyCategory = getCaseStudyCategory(caseStudyId);
  const otherCaseStudies = getMoreStudies(caseStudyId);

  const props: CaseStudyProps = {
    caseStudy,
    studyCategory,
    otherCaseStudies,
  };

  return {
    props,
  };
};

function CaseStudy({
  caseStudy,
  studyCategory,
  otherCaseStudies,
}: CaseStudyProps) {
  return (
    <CaseStudyPage
      caseStudy={caseStudy}
      studyCategory={studyCategory}
      otherCaseStudies={otherCaseStudies}
    />
  );
}

export { getStaticPaths, getStaticProps };
export default CaseStudy;
