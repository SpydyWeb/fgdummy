import { Form, Input, Select, Upload, Button, Row, Col, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function DynamicAntForm({
  config,
  zodSchema,
  defaultValues,
  mutation
}) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues
  });

  const dependencyFields = config.sections
    .flatMap((s) => s.fields)
    .filter((f) => f.condition)
    .map((f) => f.condition.field);

  const watchedValues = useWatch({
    control,
    name: dependencyFields
  });

  const isVisible = (field) => {
    if (!field.condition) return true;
    return (
      watchedValues?.[field.condition.field] === field.condition.equals
    );
  };

  const onSubmit = async (data) => {
    try {
      await mutation.mutateAsync(data);
      message.success("Submitted successfully");
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      {config.sections.map((section) => (
        <div key={section.id} style={section.style}>
          <h3>{section.title}</h3>

          <Row gutter={section.gutter || 16}>
            {section.fields.map(
              (field) =>
                isVisible(field) && (
                  <Col span={24 / section.columns} key={field.name}>
                    <Form.Item
                      label={field.label}
                      validateStatus={errors[field.name] ? "error" : ""}
                      help={errors[field.name]?.message}
                    >
                      {field.type === "textarea" && (
                        <Input.TextArea
                          rows={field.rows}
                          {...register(field.name)}
                        />
                      )}

                      {field.type === "select" && (
                        <Controller
                          name={field.name}
                          control={control}
                          render={({ field: ctrl }) => (
                            <Select {...ctrl} options={field.options} />
                          )}
                        />
                      )}

                      {field.type === "file" && (
                        <Controller
                          name={field.name}
                          control={control}
                          render={({ field: ctrl }) => (
                            <Upload
                              beforeUpload={() => false}
                              multiple={field.multiple}
                              onChange={(info) => {
                                const files = info.fileList
                                  .map((f) => f.originFileObj)
                                  .filter(Boolean);
                                ctrl.onChange(files);
                              }}
                            >
                              <Button icon={<UploadOutlined />}>
                                Upload
                              </Button>
                            </Upload>
                          )}
                        />
                      )}

                      {["text", "email"].includes(field.type) && (
                        <Input {...register(field.name)} />
                      )}
                    </Form.Item>
                  </Col>
                )
            )}
          </Row>
        </div>
      ))}

      <Button
        type="primary"
        htmlType="submit"
        loading={mutation.isPending}
        block
      >
        Submit
      </Button>
    </Form>
  );
}
