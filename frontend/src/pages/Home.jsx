// import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import Button1 from "../components/Button1";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <div className="bg-home-background-light dark:bg-home-background-dark">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-home-text-light dark:text-home-text-dark text-4xl font-bold sm:text-6xl">
              Welcome to NexTask!
            </h1>

            <p className="text-home-text-light dark:text-home-text-dark mt-6 text-lg font-medium leading-8">
              Whether you're a busy professional, a diligent student, or a
              proactive team leader, NexTask is here to streamline your
              workflow, boost productivity, and help you achieve your goals with
              ease.
            </p>

            <Button1
              title="Get Started"
              onclick={handleClick}
              classname="mt-10 !px-10 !py-3"
            />
          </div>
        </div>

        <div className="flex w-[100%] flex-col items-center justify-center gap-10">
          <h2 className="text-home-text-light dark:text-home-text-dark text-4xl font-bold">
            Why NexTask?
          </h2>

          <div className="flex w-[100%] flex-col justify-center gap-10 md:flex-row md:gap-0">
            <div className="flex w-[100%] flex-col gap-3 p-5">
              <div className="bg-home-button-background-light dark:bg-home-button-background-dark text-home-button-text-light dark:text-home-button-text-dark mb-4 flex w-12 items-center justify-center rounded-lg p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
              </div>

              <h3 className="text-home-text-light dark:text-home-text-dark w-[100%] text-start text-xl font-bold">
                Intuitive Interface
              </h3>

              <p className="text-home-text-light dark:text-home-text-dark text-lg font-medium">
                Say goodbye to cluttered to-do lists and chaotic spreadsheets.
                NexTask offers a sleek and intuitive interface inspired by the
                popular Kanban methodology, allowing you to visualize your
                tasks, prioritize effectively, and stay focused on what matters
                most.
              </p>
            </div>

            <div className="flex w-[100%] flex-col gap-3 p-5">
              <div className="bg-home-button-background-light dark:bg-home-button-background-dark text-home-button-text-light dark:text-home-button-text-dark mb-4 flex w-12 items-center justify-center rounded-lg p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>

              <h3 className="text-home-text-light dark:text-home-text-dark w-[100%] text-start text-xl font-bold">
                Secure and Reliable
              </h3>

              <p className="text-home-text-light dark:text-home-text-dark text-lg font-medium">
                Your data's security is our top priority. With robust user
                authentication and data encryption, you can trust NexTask to
                keep your information safe and secure. Focus on your tasks with
                peace of mind, knowing that your data is protected at all times.
              </p>
            </div>

            <div className="flex w-[100%] flex-col gap-3 p-5">
              <div className="bg-home-button-background-light dark:bg-home-button-background-dark text-home-button-text-light dark:text-home-button-text-dark mb-4 flex w-12 items-center justify-center rounded-lg p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="transparent"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
              </div>

              <h3 className="text-home-text-light dark:text-home-text-dark w-[100%] text-start text-xl font-bold">
                Seamless Collaboration
              </h3>

              <p className="text-home-text-light dark:text-home-text-dark text-lg font-medium">
                Collaboration is key to success, and NexTask makes it
                effortless. Share tasks, assign responsibilities, and track
                progress in real-time with your team members or collaborators.
                Whether you're working remotely or in the same office, NexTask
                keeps everyone on the same page.
              </p>
            </div>
          </div>
        </div>

        <div className="border-border-light dark:border-border-dark my-40 flex w-[100%] flex-col items-center justify-center gap-10 border-t pt-40">
          <h3 className="text-home-text-light dark:text-home-text-dark text-3xl font-bold sm:text-6xl">
            Get Started Today
          </h3>

          <p className="text-home-text-light dark:text-home-text-dark max-w-2xl text-center text-lg leading-8">
            Join thousands of satisfied users who have transformed the way they
            work with NexTask. Start your journey towards greater productivity
            and success today!
          </p>

          <Button1
            title="Get Started"
            onclick={handleClick}
            classname="mt-10 !px-10 !py-3"
          />
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
