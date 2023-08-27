import AuthForm from "./auth-form";

export default function Home() {
  return (
    <div className="px-[15%] mt-5">
      <div>
        <h1>Wellcome (back) to Nihongo-Meister!</h1>
        <p>
          Let&apos;s start today&apos;s lesson! <br />
        </p>
      </div>
      <div>
        <AuthForm />
      </div>
    </div>
  );
}
