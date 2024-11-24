import PageTitle from "@/components/custom/page-title.tsx";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart.tsx";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import useGetSpaceDashboard from "@/hooks/spaces/use-get-space-dashboard.ts";
import {useSpace} from "@/hooks/spaces/use-space.ts";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";

export function DashboardPage() {

    const {selectedSpace} = useSpace();
    const {data: pageData, isLoading} = useGetSpaceDashboard({idSpace: Number(selectedSpace?.id)});

    const chartConfig = {
        posts: {
            label: "Postagens",
            color: "#2563eb",
        },
    } satisfies ChartConfig;

    return (
        <div className="grow mt-8 mx-6">
            <PageTitle title={'Dashboard'} />

            {!pageData || isLoading ? (
                <div className='flex flex-1'>
                    <LoadingSpinner />
                </div>
            ) : (
                <div>
                    <div className="flex flex-col gap-4 mt-3">
                        <div className="flex gap-4">
                            <Card className='w-full'>
                                <CardHeader>
                                    <span className='text-xl italic font-semibold'>Postagens mês atual</span>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold">{pageData.postsMonth}</p>
                                    <p className="text-sm text-gray-500">Total de postagens no mês</p>
                                </CardContent>
                            </Card>
                            <Card className='w-full'>
                                <CardHeader>
                                    <span className='text-xl italic font-semibold'>Postagens semana atual</span>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold">{pageData.postsWeek}</p>
                                    <p className="text-sm text-gray-500">Postagens feitas nesta semana</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <span className='text-xl italic font-semibold'>Postagens por semana do mês atual</span>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={chartConfig}
                                    className="w-full"
                                    style={{maxWidth: "800px", height: "300px", margin: "0 auto"}}
                                >
                                    <BarChart accessibilityLayer data={pageData.postsByWeek}>
                                        <CartesianGrid vertical={false} stroke="var(--foreground)"/>
                                        <XAxis
                                            dataKey="week"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            stroke="var(--foreground)"
                                        />
                                        <ChartTooltip content={<ChartTooltipContent/>}/>
                                        <Bar
                                            dataKey="posts"
                                            fill="var(--chart-bar)"
                                            radius={4}
                                        />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

        </div>
    );
}
