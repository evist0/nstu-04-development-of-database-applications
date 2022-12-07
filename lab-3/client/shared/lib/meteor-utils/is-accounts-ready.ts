import { useTracker } from 'meteor/react-meteor-data'

export const useIsAccountsReady = () => useTracker(() => Accounts.loginServicesConfigured(), []) //make sure the account system loaded