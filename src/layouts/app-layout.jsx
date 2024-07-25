// This page will contain links to the different pages
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="container px-6 py-4 mx-auto">
        {/*Header for the site */}
        <Header />

        <main>
          {/* Here is where those pages will be rendered */}
          {/* Due to this React Apps are know as Single Page Apps*/}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
