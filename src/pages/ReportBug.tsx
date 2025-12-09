
import FeatureUnderDevelopment from "@/components/common/FeatureUnderDevelopment";
import { Helmet } from "react-helmet-async";

const ReportBug = () => {
  return (
    <>
      <Helmet>
        <title>Report Bug | Axia Agile</title>
      </Helmet>
      <FeatureUnderDevelopment featureName="report-bug" />
    </>
  );
};

export default ReportBug;
