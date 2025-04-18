import AppLayout from '@/layouts/app-layout';
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle, } from "@/components/ui/card"
import { ChartConfig,ChartContainer,ChartLegend,ChartLegendContent,ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis,PolarAngleAxis ,PolarGrid, Radar, RadarChart } from "recharts"
import { PackageCheck, FolderKanban, TrendingUp, DollarSign, TrendingDown} from "lucide-react"
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const chartData = [
  { month: "Jan", online: 120, offline: 80 },
  { month: "Feb", online: 150, offline: 95 },
  { month: "Mar", online: 180, offline: 110 },
  { month: "Apr", online: 200, offline: 130 },
  { month: "May", online: 220, offline: 150 },
  { month: "Jun", online: 240, offline: 160 },
];

const chartConfig = {
  online: {
    label: "Penjualan Online",
    color: "hsl(var(--color-online))",
  },
  offline: {
    label: "Penjualan Offline",
    color: "hsl(var(--color-offline))",
  },
} satisfies ChartConfig;


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
                            Total Kategori
                        </CardTitle>
                        <FolderKanban className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">{totalCategories}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pendapatan</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Rp 25.000.000</div>
                        </CardContent>
                    </Card>
                    
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                {/* 2. Area Chart — Penjualan Bulanan */}
                <Card>
                <CardHeader>
                    <CardTitle>Grafik Penjualan Bulanan</CardTitle>
                    <CardDescription>
                    Menampilkan penjualan online & offline untuk 6 bulan terakhir
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        />
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                        />
                        {/* Garis & area untuk Online */}
                        <Area
                        dataKey="online"
                        type="natural"
                        fill="#34D399"  // Menggunakan warna hijau (online)
                        stroke="#34D399"
                        fillOpacity={0.4}
                    />
                    <Area
                        dataKey="offline"
                        type="natural"
                        fill="#3B82F6"  // Menggunakan warna biru (offline)
                        stroke="#3B82F6"
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
                        Total Penjualan Naik 8% bulan ini <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                        Jan – Jun 2025
                        </div>
                    </div>
                    </div>
                </CardFooter>
                </Card>
                {/* 3. Radar Chart — Pengunjung Bulanan */}
                <Card>
                <CardHeader className="items-center pb-4">
                    <CardTitle>Radar Penjualan Bulanan</CardTitle>
                    <CardDescription>
                    Perbandingan penjualan online & offline (Jan–Jun 2025)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                    >
                    <RadarChart
                        data={chartData}
                        margin={{ top: -40, bottom: -10 }}
                    >
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                        />
                        <PolarAngleAxis dataKey="month" />
                        <PolarGrid />
                        {/* Radar untuk Online */}
                        
                        <Radar
                            dataKey="online"
                            fill="#34D399"  // Menggunakan warna hijau (online)
                            stroke="#34D399"
                            fillOpacity={0.6}
                        />
                        <Radar
                            dataKey="offline"
                            fill="#3B82F6"  // Menggunakan warna biru (offline)
                            stroke="#3B82F6"
                            fillOpacity={0.6}
                        />
                        <ChartLegend className="mt-8" content={<ChartLegendContent />} />
                    </RadarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 pt-4 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none">
                    Tren Menurun 5% bulan ini <TrendingDown className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    Jan – Jun 2025
                    </div>
                </CardFooter>
                </Card>
                </div>
            </div>
        </AppLayout>
    );
}
