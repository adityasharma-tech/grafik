export default function PermissionDialog({
  allowSerialPermissions,
  isSerialPermissionDialogOpen,
  setSerialPermissionDialogOpen,
}: {
  allowSerialPermissions: () => void;
  isSerialPermissionDialogOpen: boolean;
  setSerialPermissionDialogOpen: (value: boolean) => void;
}) {
  if (isSerialPermissionDialogOpen)
    return (
      <section className="h-screen flex justify-center items-center w-screen absolute inset-0 bg-black/20 backdrop-blur-xs">
        <div className="min-w-xl rounded-2xl bg-neutral-100 inset-shadow-sm p-5">
          <div className="flex gap-x-3 items-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path
                d="M21.76 15.92L15.36 4.4C14.5 2.85 13.31 2 12 2s-2.5.85-3.36 2.4l-6.4 11.52c-.81 1.47-.9 2.88-.25 3.99.65 1.11 1.93 1.72 3.61 1.72h12.8c1.68 0 2.96-.61 3.61-1.72.65-1.11.56-2.53-.25-3.99zM11.25 9c0-.41.34-.75.75-.75s.75.34.75.75v5c0 .41-.34.75-.75.75s-.75-.34-.75-.75V9zm1.46 8.71l-.15.12c-.06.04-.12.07-.18.09-.06.03-.12.05-.19.06-.06.01-.13.02-.19.02s-.13-.01-.2-.02a.636.636 0 01-.18-.06.757.757 0 01-.18-.09l-.15-.12c-.18-.19-.29-.45-.29-.71 0-.26.11-.52.29-.71l.15-.12c.06-.04.12-.07.18-.09.06-.03.12-.05.18-.06.13-.03.27-.03.39 0 .07.01.13.03.19.06.06.02.12.05.18.09l.15.12c.18.19.29.45.29.71 0 .26-.11.52-.29.71z"
                className="fill-amber-700"
              />
            </svg>
            <span className="font-medium text-xl">
              Allow to view your serial ports.
            </span>
          </div>
          <div className="pt-3 h-full">
            <div>
              <p className="max-w-xl text-gray-700">
                Give permission to <strong>read</strong> or{" "}
                <strong>write</strong> to your serial ports to start using this
                product or may be you can skip this.
              </p>
            </div>
            <div className="flex gap-x-3 justify-end mt-10">
              <button
                onClick={() =>
                  setSerialPermissionDialogOpen(!isSerialPermissionDialogOpen)
                }
                className="bg-neutral-200 px-12 py-2 py text-gray-900 rounded-xl hover:cursor-pointer hover:bg-neutral-300 hover:inset-shadow transition-colors duration-200 text-sm font-medium"
              >
                Skip
              </button>
              <button
                onClick={allowSerialPermissions}
                className="bg-amber-600 px-6 py-2 py text-white rounded-xl hover:cursor-pointer hover:bg-amber-800 hover:inset-shadow transition-colors duration-200 text-sm font-medium"
              >
                Allow serial read/write
              </button>
            </div>
          </div>
        </div>
      </section>
    );
}
