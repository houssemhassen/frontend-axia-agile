
import FeatureUnderDevelopment from "@/components/common/FeatureUnderDevelopment";
import { Helmet } from "react-helmet-async";

const PullRequests = () => {
  return (
    <>
      <Helmet>
        <title>Pull Requests | Axia Agile</title>
      </Helmet>
      <FeatureUnderDevelopment featureName="pull-requests" />
    </>
  );
};

export default PullRequests;
