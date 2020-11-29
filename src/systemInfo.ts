export async function getFullSystemInfo(): Promise<any> {
  return {
    ...getUpdatedSystemInfo(),
  };
}

export async function getUpdatedSystemInfo(): Promise<any> {
  return {};
}
