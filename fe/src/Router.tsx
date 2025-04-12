import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import App from "./App";
import ACLWrapper from "./components/ACLWrapper";
import Home from "./components/Home";
import { LocationItemSearch } from "./routes/LocationItemSearch";
import { LocationSearch } from "./routes/LocationSearch";
import { Profile } from "./routes/Profile";
import UserMutate from "./routes/UserMutate";
import { UserSearch } from "./routes/UserSearch";
import { ACL } from "./utils/ACL";
import { VaccineSearch } from "./routes/VaccineSearch";
import { NotificationSearch } from "./routes/NotificationSearch";
import { SensorDataSearch } from "./routes/SensorDataSearch";

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

            <Route
              path="locations"
              element={
                <ACLWrapper fallback={<Navigate to="/" />} {...ACL.locations}>
                  <Outlet />
                </ACLWrapper>
              }
            >
              <Route index element={<LocationSearch />} />
              <Route path="create" element={<UserMutate />} />
              <Route path="update/:id" element={<UserMutate />} />
            </Route>

            <Route
              path="location-items"
              element={
                <ACLWrapper
                  fallback={<Navigate to="/" />}
                  {...ACL.locationItems}
                >
                  <Outlet />
                </ACLWrapper>
              }
            >
              <Route index element={<LocationItemSearch />} />
              <Route path="create" element={<UserMutate />} />
              <Route path="update/:id" element={<UserMutate />} />
            </Route>

            <Route
              path="vaccines"
              element={
                <ACLWrapper fallback={<Navigate to="/" />} {...ACL.vaccines}>
                  <Outlet />
                </ACLWrapper>
              }
            >
              <Route index element={<VaccineSearch />} />
              <Route path="create" element={<UserMutate />} />
              <Route path="update/:id" element={<UserMutate />} />
            </Route>

            <Route
              path="notifications"
              element={
                <ACLWrapper
                  fallback={<Navigate to="/" />}
                  {...ACL.notifications}
                >
                  <Outlet />
                </ACLWrapper>
              }
            >
              <Route index element={<NotificationSearch />} />
            </Route>

            <Route
              path="sensor-data"
              element={
                <ACLWrapper fallback={<Navigate to="/" />} {...ACL.sensorData}>
                  <Outlet />
                </ACLWrapper>
              }
            >
              <Route index element={<SensorDataSearch />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Router;
