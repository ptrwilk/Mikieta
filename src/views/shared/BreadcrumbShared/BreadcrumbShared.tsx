import { Breadcrumb } from "../../../components";

const BreadcrumbShared = () => {
  return (
    <Breadcrumb
      items={[
        { text: "Menu", path: "/" },
        { text: "Płatność", path: "/payment" },
      ]}
    />
  );
};

export { BreadcrumbShared };
