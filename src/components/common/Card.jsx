import React from "react";
const Card = ({
    children,
    title,
    subtitle,
    footer,
    className = "",
    bodyClassName = "",
    headerClassName = "",
    footerClassName = "",
    ...props
  }) => {
    return (
      <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`} {...props}>
        {(title || subtitle) && (
          <div className={`px-6 py-4 border-b ${headerClassName}`}>
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
        )}
  
        <div className={`px-6 py-4 ${bodyClassName}`}>{children}</div>
  
        {footer && <div className={`px-6 py-4 border-t bg-gray-50 ${footerClassName}`}>{footer}</div>}
      </div>
    )
  }
  
  export default Card
  
  