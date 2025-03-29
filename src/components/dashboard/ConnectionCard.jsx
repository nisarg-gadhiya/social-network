"use client"
import React from "react";
import { Link } from "react-router-dom"
import Card from "../common/Card"
import Button from "../common/Button"

const ConnectionCard = ({ connection, onConnect, onIgnore }) => {
  const { id, name, avatar, title, mutualConnections, isConnected } = connection

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-start">
        <Link to={`/profile/${id}`} className="flex-shrink-0">
          <img
            src={avatar || "/src/assets/images/default-avatar.png"}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </Link>

        <div className="ml-3 flex-1">
          <Link to={`/profile/${id}`} className="font-medium text-blue-600 hover:underline">
            {name}
          </Link>

          {title && <p className="text-sm text-gray-600">{title}</p>}

          {mutualConnections > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {mutualConnections} mutual connection{mutualConnections !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        {isConnected ? (
          <Button variant="outline" size="small" fullWidth disabled>
            Connected
          </Button>
        ) : (
          <>
            <Button variant="primary" size="small" onClick={() => onConnect(id)}>
              Connect
            </Button>

            <Button variant="outline" size="small" onClick={() => onIgnore(id)}>
              Ignore
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}

export default ConnectionCard