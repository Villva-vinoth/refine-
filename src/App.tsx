import { Category } from "@mui/icons-material";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  AuthPage,
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/mui";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard";
import CustomLogo from "./components/login/CustomLogo";
import CustomTitle from "./components/title/CustomTitle";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { usePriority } from "./hooks/usePriority";
import {
  CategoryList,
  CreateCategory,
  EditCategory,
  ShowCategory,
} from "./pages/category/index";
import {
  CreateProduct,
  EditProduct,
  ProductList,
  ShowProduct,
} from "./pages/product/index";
import authProvider from "./providers/authProviders";
import { customTitleBar } from "./components/TitleBar/CustomTitleBar";

function App() {
  const Responsibility = usePriority();

  const resource = [
    {
      name: Responsibility.canCreate == true ? "products" : "",
      list: Responsibility.canCreate == true ? "/products" : undefined,
      show: "/products/show/:id",
      create: Responsibility.canCreate == true ? "/products/create" : undefined,
      edit: Responsibility.canEdit == true ? "/products/edit/:id" : undefined,
      options: {
        label: "Product",
        icon: <Category />,
      },
    },
    {
      name: "categories",
      list: "/categories",
      show: "/categories/show/:id",
      create:
        Responsibility.canCreate == true ? "/categories/create" : undefined,
      edit: Responsibility.canEdit == true ? "/categories/edit/:id" : undefined,
      options: {
        label: "category",
        icon: <Category />,
      },
    },
  ];

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerBindings}
                authProvider={authProvider}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
                notificationProvider={useNotificationProvider}
                resources={resource}
              >
                <DocumentTitleHandler handler={customTitleBar} />
                <Routes>
                  <Route
                    path="/login"
                    element={
                      <AuthPage
                        type="login"
                        title={<CustomLogo />}
                        rememberMe={false}
                        forgotPasswordLink={false}
                        registerLink={false}
                        formProps={{
                          defaultValues: {
                            email: "",
                            password: "",
                          },
                        }}
                      />
                    }
                  />
                  <Route path="*" element={<ErrorComponent />} />

                  <Route
                    element={
                      <Authenticated
                        fallback={<CatchAllNavigate to="/login" />}
                        key="authenticated-routes"
                      >
                        <ThemedLayoutV2 Title={CustomTitle}>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route path="/" element={<Dashboard />} />

                    <Route path="/products">
                      <Route index element={<ProductList />} />
                      <Route path="show/:id" element={<ShowProduct />} />
                      {Responsibility.canCreate && (
                        <Route path="create" element={<CreateProduct />} />
                      )}
                      {Responsibility.canEdit && (
                        <Route path="edit/:id" element={<EditProduct />} />
                      )}
                    </Route>
                    <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="show/:id" element={<ShowCategory />} />
                      {Responsibility.canCreate && (
                        <Route path="create" element={<CreateCategory />} />
                      )}
                      {Responsibility.canEdit && (
                        <Route path="edit/:id" element={<EditCategory />} />
                      )}
                    </Route>
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
