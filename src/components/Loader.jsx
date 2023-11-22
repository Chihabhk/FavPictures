import { Vortex } from "react-loader-spinner";

export const Loader = () => {
    return (
        <div className="loading">
            <Vortex
                visible={true}
                height="110"
                width="110"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={["red", "green", "blue", "yellow", "orange", "purple"]}
            />
        </div>
    );
};
