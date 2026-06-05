# MyPasswordStrength.NET.MAUI

[![.NET Build & Test](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/dotnet.yml/badge.svg)](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/dotnet.yml)

> A .NET MAUI library for validating password strength based on customizable complexity requirements.

## Background

Define your password strength complexity requirements with ease using the library. 

The package provides a `PasswordStrengthEntry` entry that you can use to validate passwords in your .NET MAUI forms.

You can set the password strength requirements through the properties of the `MyPasswordStrengthOptions` class and pass the options to the function.

The special characters considered in the validation are: @$!%*?&. 

You can modify this set of special characters by setting the `SpecialCharacters` property of the options to a custom string of special characters.

### Sample Usage

```c#
using Microsoft.Maui.Controls.Shapes;
using MyPasswordStrength;
using System.Runtime.Versioning;

namespace MyTestMAUIAPP.Pages;

[SupportedOSPlatform("android")]
[SupportedOSPlatform("ios")]
[SupportedOSPlatform("maccatalyst")]
[SupportedOSPlatform("windows")]
public class Registration : ContentPage
{    
    private readonly PasswordStrengthEntry _entry;
    private readonly Border _border;
    private readonly Label _errorLabel;

    public Registration()
	{
		var content = new VerticalStackLayout
		{
			Children = {
				new Label { 
                    HorizontalOptions = LayoutOptions.Center, 
                    VerticalOptions = LayoutOptions.Center, 
                    Text = "Welcome to .NET MAUI!" 
                }
			}
		};

        _entry = new PasswordStrengthEntry(HandleOnValidation, GetOptions(), "Enter your password")
        {
            HorizontalOptions = LayoutOptions.Fill,
            VerticalOptions = LayoutOptions.Fill
        };        

        _border = new Border
        {
            Stroke = Colors.Black,          // Border color
            StrokeThickness = 1,          // Border width in device-independent units
            StrokeShape = new Rectangle(),  //Square border 
            Margin = 10,
            Content = _entry            
        };

        _errorLabel = new Label
        {
            Text = "Password must be at least 9 chars, 2 uppercase, 3 lowercase, 2 digit, 2 special char, no more than 2 same consecutive chars",
            TextColor = Colors.Red,
            HorizontalOptions = LayoutOptions.Center,
            VerticalOptions = LayoutOptions.Center,
            IsVisible = false
        };

        content.Children.Add(_border);
        content.Children.Add(_errorLabel);

        Content = content;
	}

    private MyPasswordStrengthOptions GetOptions()
    {
        var options = new MyPasswordStrengthOptions();

        options.MinimumLength = 9;
        options.RequireUppercase = true;
        options.MinimumUppercase = 2;
        options.RequireLowercase = true;
        options.MinimumLowercase = 3;
        options.RequireDigit = true;
        options.MinimumDigit = 2;
        options.RequireSpecialCharacter = true;
        options.MinimumSpecialCharacter = 2;
        options.RequireMaxNoOfSameConsecutiveCharacters = true;
        options.MaximumNoOfSameConsecutiveCharacters = 2;

        return options;
    }

    private async void HandleOnValidation(string pwd, bool isValid)
    {
        if (isValid)
        {
            _border.Stroke = Colors.Green;
            _errorLabel.IsVisible = false;
        }
        else
        {
            _border.Stroke = Colors.Red;
            _errorLabel.IsVisible = true;
        }
    }
}
```

![Password Strength Invalid](PasswordStrengthError.jpeg)

![Password Strength Valid](PasswordStrength.jpeg)

## License

MIT © [VeritasSoftware](https://github.com/VeritasSoftware)