/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";

const PotholeForm = ({ position, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      latitude: position?.lat,
      longitude: position?.lng,
      severity: "medium",
    },
  });

  const submitForm = (data) => {
    onSubmit({
      ...data,
      latitude: position.lat,
      longitude: position.lng,
      size: {
        width: parseFloat(data.width),
        depth: parseFloat(data.depth),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          {...register("address", { required: "Address is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Severity
        </label>
        <select
          {...register("severity")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Width (cm)
          </label>
          <input
            type="number"
            {...register("width", { min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Depth (cm)
          </label>
          <input
            type="number"
            {...register("depth", { min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        Submit Report
      </button>
    </form>
  );
};

export default PotholeForm;
