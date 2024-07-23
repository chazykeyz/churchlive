export const successResponse = (data = null, error = null, notify, silent) => {
  const result = {
    data: null,
    message: null,
    success: false,
    errors: null,
  };

  if (error) {
    let convert_error = null;
    const phone_number_error = "non_field_errors";
    if (Object.keys(error)[0] === phone_number_error) {
      convert_error = {
        phone_number: ["Phone number already taken"],
      };
    }
    if (!silent) {
      const error_list = convert_error ? convert_error : error;
      for (const key of Object.keys(error_list)) {
        notifyError(
          `${
            error_list[key] === undefined
              ? "Oop an error has occured"
              : error_list[key]
          }`
        );
      }
    }

    result.message = error.message;
    result.errors = convert_error ? convert_error : error;
  }
  if (data !== null) {
    // if (notify) {
    //   notifySucess(`${data.message}`);
    // }
    result.data = data?.data;
    result.success = true;
    result.message = data.message;
  }

  return result;
};
