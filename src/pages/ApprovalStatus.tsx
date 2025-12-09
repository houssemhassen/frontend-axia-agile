
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ApprovalStatus = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Account Pending | Axia Agile</title>
        <meta name="description" content="Your account is pending approval" />
      </Helmet>

      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
        <Card className="max-w-md w-full shadow-lg border-slate-200">
          <CardHeader className="space-y-2 text-center pb-2">
            <div className="mx-auto bg-amber-50 p-3 rounded-full w-16 h-16 flex items-center justify-center">
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Account Pending</CardTitle>
            <CardDescription className="text-slate-500">
              Your account is awaiting approval from an administrator
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-2">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              <span className="text-sm font-medium text-amber-700">Pending Approval</span>
            </div>
            <p className="text-slate-600 text-sm">
              You will receive an email notification once your account has been approved.
              This process typically takes 24-48 hours.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} />
              Return to Home
            </Button>
            <p className="text-xs text-center text-slate-500 px-4">
              If you believe this is an error or have questions, please contact
              <a href="mailto:support@axiaagile.com" className="text-sky-600 hover:text-sky-700 font-medium"> support@axiaagile.com</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ApprovalStatus;
