import AppLayout from '@/layouts/app-layout';
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle, } from "@/components/ui/card"
import { ChartConfig,ChartContainer,ChartLegend,ChartLegendContent,ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis,PolarAngleAxis ,PolarGrid, Radar, RadarChart } from "recharts"
import { PackageCheck, FolderKanban, TrendingUp } from "lucide-react"
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--color-desktop))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--color-mobile))",
    },
  } satisfies ChartConfig


export default function Dashboard({ totalProducts = 0, totalCategories = 0 }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Produk
                        </CardTitle>
                        <PackageCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">{totalProducts}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Produk
                        </CardTitle>
                        <PackageCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">{totalProducts}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Kategori
                        </CardTitle>
                        <FolderKanban className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">{totalCategories}</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Area Chart - Legend</CardTitle>
                        <CardDescription>
                        Showing total visitors for the last 6 months
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                            left: 12,
                            right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                            />
                            <Area
                            dataKey="mobile"
                            type="natural"
                            fill="hsl(var(--color-mobile))"
                            stroke="hsl(var(--color-mobile))"
                            fillOpacity={0.4}
                            />
                            <Area
                            dataKey="desktop"
                            type="natural"
                            fill="hsl(var(--color-desktop))"
                            stroke="hsl(var(--color-desktop))"
                            fillOpacity={0.4}
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            January - June 2024
                            </div>
                        </div>
                        </div>
                    </CardFooter>
                    </Card>
                <Card>
                    <CardHeader className="items-center pb-4">
                        <CardTitle>Radar Chart - Legend</CardTitle>
                        <CardDescription>
                        Showing total visitors for the last 6 months
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                        >
                        <RadarChart
                            data={chartData}
                            margin={{
                            top: -40,
                            bottom: -10,
                            }}
                        >
                            <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                            />
                            <PolarAngleAxis dataKey="month" />
                            <PolarGrid />
                            <Radar
                            dataKey="desktop"
                            fill="hsl(var(--color-desktop))"
                            stroke="hsl(var(--color-desktop))"
                            fillOpacity={0.6}
                            />
                            <Radar 
                            dataKey="mobile"
                            fill="hsl(var(--color-mobile))"
                            stroke="hsl(var(--color-mobile))"
                            fillOpacity={0.6}
                            />
                            <ChartLegend className="mt-8" content={<ChartLegendContent/>} />
                        </RadarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 pt-4 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                        January - June 2024
                        </div>
                    </CardFooter>
                </Card>
                </div>
            </div>
        </AppLayout>
    );
}
