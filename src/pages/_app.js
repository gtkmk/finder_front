import * as React from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "@/styles/theme";
import Layout from "@/components/layout"; 
import "react-toastify/dist/ReactToastify.css";


export default function App({ Component, pageProps }) {
  // Verifique se a página atual é a de Login ou Registro
  const isLoginPage = Component === 'login';
  const isRegisterPage = Component === 'register';

  if (isLoginPage || isRegisterPage) {
    // Renderize a página de Login ou Registro sem o layout padrão
    return (
      <AppCacheProvider {...pageProps}>
        <Head />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
          <ToastContainer />
        </ThemeProvider>
      </AppCacheProvider>
    );
  }

  // Renderize as outras páginas com o layout padrão
  return (
    <AppCacheProvider {...pageProps}>
      <Head />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </ThemeProvider>
    </AppCacheProvider>
  );
}

// export default function App({ Component, pageProps }) {
//   return (
//     <AppCacheProvider {...pageProps}>
//       <Head />
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Component {...pageProps} />
//         <ToastContainer />
//       </ThemeProvider>
//     </AppCacheProvider>
//   );
// }
