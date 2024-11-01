import React, { Fragment, useContext } from "react";
import { HomeContext } from "./index";

const ProductCategory = (props) => {
  const { data, dispatch } = useContext(HomeContext);

  return (
    <Fragment>
      <div className="flex justify-between font-medium">
        {data.categories && data.categories.map((category)  => (
          <div
            key={category.id} // Đảm bảo `category.id` là duy nhất
            onClick={(e) =>
              dispatch({
                type: "categoryListDropdown",
                payload: !data.categoryListDropdown,
              })
            }
            className={`flex items-center space-x-1 cursor-pointer ${
              data.categoryListDropdown ? "text-yellow-700" : ""
            }`}
          >
            <span className="text-md md:text-lg hover:text-yellow-700">
              {category.name}
            </span>
            <svg
              className="w-4 h-4 text-yellow-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ProductCategory;
