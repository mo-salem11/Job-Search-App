
export const generateMessage=(entity)=>({
    createSuccessfully:`${entity} is created successfully`,
    updateSuccessfully:`${entity} is updated successfully`,
    deleteSuccessfully:`${entity} is deleted successfully`,
    notFound:`${entity} not found`,
    failedToCreate:`failed to create ${entity}`,
    failedToUpdate:`failed to update ${entity}`,
    failedToDelete:`failed to delete ${entity}`,
    getData:`${entity} data retrieved successfully`
})

export const messages={
    user:{
        userNotFound:"User not found. Please check the use info and try again.",
        userAlreadyExist:"User already exists. Please choose a different Email.",
        createUser:"User created successfully. Welcome!",
        verifyAccount:"Account verified successfully. You can Login now!",
        invalidCredentials:"Invalid credentials",
        signInSuccessfully:"User signed in successfully",
        mustLogin:"You must login first.",
        getDataSuccessfully:"User data retrieved successfully",
        deleteAccount:"Account deleted successfully",
        updateAccount:"Account updated successfully",
        notExsistAccounts:"No accounts associated with this recovery email",
        updatePassword:"Password changed successfully",
        notAuthorized:"User is not authorized",
        resetCodeSuccess:'Reset code sent successfully',
        invalidCode:"Code is invalid",
        validCode:"Reset code is valid",
        resetPassSuccess:"Password reset successfully.",
    },
    token:{
        noToken:" No token provided. Please sign up again.",
        invalidToken:"Invalid token. Please log in again.",
        invalidBearerKey:"invalid bearer key",
        invalidPayload:"invalid payload"

    },
    company:{
        ...generateMessage('Company'),
        noAccess:'You do not have access to this company\'s jobs'
    },
    job:{
        ...generateMessage('Job'),
        noJobs:"There is not jobs",
    },
    application:{
        isRequired:"Resume file is required",
    }
}