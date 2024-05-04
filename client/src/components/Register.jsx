import Button from "./Button";

const Register = () => {
  return (
    <div>
      <div>
        <h2>Register</h2>
      </div>
      <form>
        <label htmlFor="">Email: </label>
        <input type="text" placeholder="example@gmail.com" />
        <label htmlFor="">Password: </label>
        <input type="password" placeholder="......." />
        <Button primary>Sign Up</Button>
      </form>
    </div>
  );
};

export default Register;
