import { CssBaseline } from "@mui/material";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "@libs/query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@libs/theme";
import { AppRouter } from "./routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
