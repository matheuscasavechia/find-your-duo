import { Layout } from "./Layout";
import { LayoutProps } from "./types";

export const Controller = ({
  title,
  adsCount,
  bannerUrl,
}: LayoutProps): JSX.Element => {
  return <Layout title={title} adsCount={adsCount} bannerUrl={bannerUrl} />;
};
