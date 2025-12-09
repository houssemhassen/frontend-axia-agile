
import { Link } from "react-router-dom";

const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-bold text-lg">A</div>
      <span className="font-bold text-lg text-slate-900">Axia Agile</span>
    </Link>
  );
};

export default HeaderLogo;
