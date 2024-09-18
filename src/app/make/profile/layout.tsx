import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  
export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-100 to-orange-300">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/make">Make Portfolio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1>Profile</h1>
        {children}
        </div>
        </div>
    )
}