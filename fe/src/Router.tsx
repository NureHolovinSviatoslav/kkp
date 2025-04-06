import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import { Profile } from "./routes/Profile";
import UserMutate from "./routes/UserMutate";
import ACLWrapper from "./components/ACLWrapper";
import { ACL } from "./utils/ACL";
import { UserSearch } from "./routes/UserSearch";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const Router = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="*" element={<>Сторінку не знайдено</>} />

            <Route path="profile" element={<Profile />} />

            <Route
              path="users"
              element={
                <ACLWrapper fallback={<Navigate to="/" />} {...ACL.users}>
                  <Outlet />
                </ACLWrapper>
              }
            >
              <Route index element={<UserSearch />} />
              <Route path="create" element={<UserMutate />} />
              <Route path="update/:id" element={<UserMutate />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Router;
