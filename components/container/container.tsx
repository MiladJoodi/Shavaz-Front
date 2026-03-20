
interface children{
    children: React.ReactNode;
    className?:string
}

const Container = ({children,className}:children) => {
    return (
        <div className={`container mx-auto max-w-7xl px-3 md:px-6 lg:px-10 ${className}`}>
            {children}
        </div>
    );
}

export default Container;