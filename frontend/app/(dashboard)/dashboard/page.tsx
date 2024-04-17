import { ArticleClient } from "@/components/tables/article-tables/client";
import { users } from "@/constants/data";
import BreadCrumb from "@/components/breadcrumb";

const breadcrumbItems = [{ title: "", link: "/dashboard" }];
export default function page() {
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <ArticleClient data={users} />
    </div>
  );
}
