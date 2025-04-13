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
import { LocationDetails } from "./routes/LocationDetails";
import { LocationItemDetails } from "./routes/LocationItemDetails";
import LocationItemMutate from "./routes/LocationItemMutate";
import { LocationItemSearch } from "./routes/LocationItemSearch";
import LocationMutate from "./routes/LocationMutate";
import { LocationSearch } from "./routes/LocationSearch";
import { NotificationDetails } from "./routes/NotificationDetails";
import { NotificationSearch } from "./routes/NotificationSearch";
import { Profile } from "./routes/Profile";
import { ReportDetails } from "./routes/ReportDetails";
import { SensorDataDetails } from "./routes/SensorDataDetails";
import { SensorDataSearch } from "./routes/SensorDataSearch";
import { UserDetails } from "./routes/UserDetails";
import UserMutate from "./routes/UserMutate";
import { UserSearch } from "./routes/UserSearch";
import VaccineMutate from "./routes/VaccineMutate";
import { VaccineSearch } from "./routes/VaccineSearch";
import { ACL } from "./utils/ACL";
import { VaccineDetails } from "./routes/VaccineDetails";

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
              <Route path=":id" element={<UserDetails />} />
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
              <Route path="create" element={<LocationMutate />} />
              <Route path="update/:id" element={<LocationMutate />} />
              <Route path=":id" element={<LocationDetails />} />
            </Route>

            <Route
              path="locations/report/:id"
              element={
                <ACLWrapper fallback={<Navigate to="/" />} {...ACL.reports}>
                  <ReportDetails />
                </ACLWrapper>
              }
            />

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
              <Route path="create" element={<LocationItemMutate />} />
              <Route path="update/:id" element={<LocationItemMutate />} />
              <Route path=":id" element={<LocationItemDetails />} />
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
              <Route path="create" element={<VaccineMutate />} />
              <Route path="update/:id" element={<VaccineMutate />} />
              <Route path=":id" element={<VaccineDetails />} />
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
              <Route path=":id" element={<NotificationDetails />} />
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
              <Route path=":id" element={<SensorDataDetails />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Router;
