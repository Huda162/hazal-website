import { Link } from "react-router-dom";

export default function BrandSection({ className, brands }) {
  return (
    <div   className={`w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        <div className=" section-title flex justify-between items-center mb-5"></div>
        <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2">
          {brands?.map((item, index) => (
            <div className="item " key={index} style={{display: 'flex', justifyContent: 'center'}}>
              <Link to={`/all-products/brand/${item.id}/${item.name}`}>
                <div className="w-[130px] h-[130px] p-1 mt-3 bg-white border border-primarygray bg-[#EEF1F1] hover:bg-main-color" >
                  <img
                    src={item.image}
                    alt="logo"
                    style={{ height: "100%" }}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
