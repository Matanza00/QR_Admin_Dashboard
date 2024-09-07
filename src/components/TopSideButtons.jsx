import { useNavigate } from "react-router-dom";

const TopSideButtons = ({ btnTitle, navigateTo }) => {
  const navigate = useNavigate();

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => navigate(navigateTo)}
      >
        {btnTitle}
      </button>
    </div>
  );
};

export default TopSideButtons;
