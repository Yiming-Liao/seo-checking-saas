import { useTranslations } from 'next-intl';
import { PieChart, Pie, Cell } from 'recharts';

const BestPracticesChart = ({ report }: any) => {
    const t = useTranslations('Report');

    const data = [
        { name: 'Score', value: Number((report.bestPractices.score * 100).toFixed(0)) - 1 },
        { name: 'Remainder', value: 100 - Number((report.bestPractices.score * 100).toFixed(0)) + 1 },
    ];

    // Chart 顏色  紅色:<33% 橘色>=33%&&<66% 綠色:>=66%
    let color = "";
    if (data[0].value < 33) color = "#a23333";
    else if (data[0].value >= 33 && data[0].value < 66) color = "#e69951";
    else color = "#66a266";
    const COLORS = [color];


    return (
        <div className='flex flex-col items-center gap-2'>
            <h2 className=''>{t('best_practices')}</h2>
            <div className="relative w-fit">
                <PieChart width={120} height={120}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        paddingAngle={5}
                        innerRadius={40}
                        outerRadius={60}
                        dataKey="value"
                        startAngle={90}  // 設置起始角度，90 代表從頂部開始
                        endAngle={-270}  // 設置結束角度，這樣繪製的甜甜圈圖會是順時針方向
                        cornerRadius={10}  // 這個屬性設置圓角半徑
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? COLORS[0] : 'rgba(0, 0, 0, 0.05)'} />
                        ))}
                    </Pie>
                </PieChart>
                <p className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-xl">
                    {(report.bestPractices.score * 100 - 1).toFixed(0) + '%'}
                </p>
            </div>
        </div>
    )
}
export default BestPracticesChart