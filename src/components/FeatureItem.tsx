interface FeatureItemProps {
  title: string;
  description: string;
  icon: string;
}

export default function FeatureItem({ title, description, icon }: FeatureItemProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 text-2xl">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}
