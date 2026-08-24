"use client";

import FormInput from "./fields/FormInput";
import FormSelect from "./fields/FormSelect";
import FormTextarea from "./fields/FormTextarea";
import FormCheckbox from "./fields/FormCheckbox";
import FormFile from "./fields/FormFile";

export default function WasiyahForm({
  section,
  data,
  updateField,
  updateCheckbox,
}) {
  return (
    <section className="relative rounded-[20px] bg-white px-5 py-8 shadow-sm border border-gray-100 sm:px-8 lg:p-10">
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-0 h-[4px] w-full bg-gradient-to-r from-[#3198A0] to-[#51F909] rounded-t-[20px]" />

      {/* Section Header */}
      <div className="mb-8 border-b border-gray-100 pb-5">
        <h2 className="text-xl font-bold text-[#00401A] sm:text-2xl">
          {section.title}
        </h2>

        {section.description && (
          <p className="mt-2 text-sm leading-6 text-gray-500 font-medium">
            {section.description}
          </p>
        )}
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {section.fields.map((field) => {
          const value = data[field.name];

          switch (field.type) {
            case "input":
              return (
                <div
                  key={field.name}
                  className={field.fullWidth ? "md:col-span-2" : ""}
                >
                  <FormInput
                    {...field}
                    value={value}
                    onChange={updateField}
                  />
                </div>
              );

            case "select":
              return (
                <div
                  key={field.name}
                  className={field.fullWidth ? "md:col-span-2" : ""}
                >
                  <FormSelect
                    {...field}
                    value={value}
                    onChange={updateField}
                  />
                </div>
              );

            case "textarea":
              return (
                <div
                  key={field.name}
                  className={field.fullWidth ? "md:col-span-2" : ""}
                >
                  <FormTextarea
                    {...field}
                    value={value}
                    onChange={updateField}
                  />
                </div>
              );

            case "checkbox":
              return (
                <div
                  key={field.name}
                  className={field.fullWidth ? "md:col-span-2" : ""}
                >
                  <FormCheckbox
                    {...field}
                    checked={Boolean(value)}
                    onChange={() => updateCheckbox(field.name)}
                  />
                </div>
              );

            case "file":
              return (
                <div
                  key={field.name}
                  className={field.fullWidth ? "md:col-span-2" : ""}
                >
                  <FormFile
                    {...field}
                    value={value}
                    onChange={updateField}
                  />
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </section>
  );
}