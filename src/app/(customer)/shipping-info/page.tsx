import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ShippingInfo = () => {
  return (
    <div className="pb-10">
      <Breadcrumb className="md:px-[200px] mt-24 px-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="text-zinc-500 hover:text-zinc-500/90"
              href="/"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-black">
              Shipping Info
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-center mt-10 text-2xl font-bold">
        1 Market Philippines | Shipping Info
      </h1>
      <div className="mt-10 md:px-[200px] px-10">
        <Table>
          <TableHeader className="border bg-secondary">
            <TableRow>
              <TableHead>Courier</TableHead>
              <TableHead>Costs</TableHead>
              <TableHead>Shipping Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border">
            <TableRow>
              <TableCell>Motorcycle</TableCell>
              <TableCell>₱30.00</TableCell>
              <TableCell>20-30 minutes (within 5 km)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bicycle</TableCell>
              <TableCell>₱30.00</TableCell>
              <TableCell>30-45 minutes (within 3 km)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="font-semibold mt-10">Shipping address</p>
        <p className="mt-3 text-muted-foreground">
          Please ensure that you have provided the correct and current address
          for shipping and delivery within Villamor Air Base, Pasay City.
          Deliveries are strictly limited to this area, and we are unable to
          ship outside its boundaries. Large products, valuables, perishables,
          or items requiring special handling may have specific delivery
          conditions. Additionally, certain orders may require a physical
          address or signature confirmation upon receipt. Please note that
          deliveries to restricted areas within Villamor Air Base may be subject
          to additional security protocols or limitations.
        </p>
        <p className="font-semibold mt-10">Shipping time and cost</p>
        <p className="mt-3 text-muted-foreground">
          After your order has been successfully paid and confirmed, you will
          see the estimated delivery time and shipping cost on your order
          confirmation page. You will also receive an order confirmation message
          outlining the processing time for your order. Once your order has been
          shipped, you will receive a notification with the expected delivery
          timeframe. A shipment notification message will be sent to you,
          providing the delivery time for each package. If a tracking number is
          available, it will be included in the notification. You can also check
          your order history to view the latest updates on your delivery. While
          we strive to ensure timely deliveries, actual delivery dates may be
          affected by weather conditions, security protocols within Villamor Air
          Base, or other external factors. Please refer to the tracking
          information for the most up-to-date delivery status.
        </p>
        <p className="font-semibold mt-10">Issues regarding delivery</p>
        <p className="mt-3 text-muted-foreground">
          If your package has not been delivered or your tracking information
          shows that your package has been delivered but you have not received
          it, please contact our customer service immediately and within 7 days
          of the order date.
        </p>
      </div>
    </div>
  );
};

export default ShippingInfo;
