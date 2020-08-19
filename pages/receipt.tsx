import { useRouter } from "next/router";
import { useOrder } from "../helpers/hooks";
import { withTranslation } from "../helpers/i18n";
import Head from "next/head";
import Layout from "../components/Layout";
import Splash from "../components/Splash";
import { downloadPdfDocument } from "../components/Download";

const Receipt = (props) => {
  const router = useRouter();
  const { data, isLoading } = useOrder(router.query.session_id);

  if (isLoading) {
    return <Splash content={"Henter kvittering"}></Splash>;
  }

  const { draft, order } = data;

  return (
    <Layout>
      <Head>
        <title>InkTemplate - Receipt</title>
      </Head>
      <div className="content">
        <h2>Takk for betalingen!</h2>
        <p>Vi har sendt print på mail til {order.customer.email}</p>
        <div>
          <button onClick={() => downloadPdfDocument(draft)}>
            Download PDF
          </button>
        </div>
      </div>
      <style jsx>{`
        .content {
          padding: 3% 5%;
          max-width: 1030px;
          margin: 0 auto;
          margin-bottom: 10%;
        }
      `}</style>
      <style jsx global>{`
        .container {
          background-color: rgb(238, 233, 231, 0.8);
        }
      `}</style>
    </Layout>
  );
};

Receipt.getInitialProps = ({ query }) => {
  return {
    namespacesRequired: ["common"],
  };
};

export default withTranslation("common")(Receipt);
