import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import { useDispatch } from "react-redux";
import { userLogin } from "./userSlice";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    erp_number: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  let dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.erp_number.trim() === "")
      return setErrorMessage("Employee Number is required!");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Password is required!");
    else {
      let obj = {
        employeeCode: loginObj.erp_number,
        password: loginObj.password,
      };
      dispatch(userLogin(obj)).then((res) => {
        if (res?.payload?.status === "success") {
          let token = res?.payload?.token;
          localStorage.setItem("token", token);
          window.location.href = "/app/welcome";
        }
      });
      // setLoading(true);
      // // Call API to check user credentials and save token in localstorage
      // localStorage.setItem("token", "DumyTokenHere");
      // setLoading(false);
      // window.location.href = "/app/welcome";
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/app/welcome";
    }
  }, []);

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  type="erp_number"
                  defaultValue={loginObj.erp_number}
                  updateType="erp_number"
                  containerStyle="mt-4"
                  labelTitle="Employee Id"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>

              <div className="text-right text-primary">
                <Link to="/forgot-password">
                  <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                }
              >
                Login
              </button>

              {/* <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
