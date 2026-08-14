using System;
using System.Diagnostics;
using System.IO;

// DeepSeek Harness launcher: opens start-dsh.bat in a console window.
internal static class Launcher
{
    [STAThread]
    private static void Main()
    {
        string dir = Path.GetDirectoryName(Environment.GetCommandLineArgs()[0]);
        string bat = Path.Combine(dir, "start-dsh.bat");
        if (!File.Exists(bat)) return;
        try
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = bat,
                WorkingDirectory = dir,
                UseShellExecute = true
            });
        }
        catch
        {
            // ignore: bat will show its own error
        }
    }
}
