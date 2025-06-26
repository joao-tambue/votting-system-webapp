export const ausQueryKeys = {
  getVehiclesQueryKey: () => ["vehicles-list"],
  getFeesQueryKey: () => ["fees-list"],
  createCompanyKey: () => ["create-company"],
  toggleCompanyStatusQueryKey: () => ["toggle-company-status"],
  updateCompanyQueryKey: (companyId: string) => ["update-company", companyId],
};
