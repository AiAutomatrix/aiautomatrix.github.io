import { useState } from 'react'
import { Upload, Edit, ArrowRight, Download, Clock } from 'lucide-react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select"
import { Progress } from "/components/ui/progress"

// Mock data for vehicle makes and models
const vehicleMakes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi']
const toyotaModels = ['Camry', 'Corolla', 'RAV4', 'Prius', 'Highlander']
const hondaModels = ['Accord', 'Civic', 'CR-V', 'Pilot', 'Odyssey']
const fordModels = ['F-150', 'Escape', 'Explorer', 'Mustang', 'Focus']
const chevroletModels = ['Silverado', 'Equinox', 'Tahoe', 'Camaro', 'Malibu']
const bmwModels = ['3 Series', '5 Series', 'X3', 'X5', '7 Series']
const mercedesModels = ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class']
const audiModels = ['A4', 'A6', 'Q5', 'Q7', 'e-tron']

const getModelsForMake = (make: string) => {
  switch (make) {
    case 'Toyota': return toyotaModels
    case 'Honda': return hondaModels
    case 'Ford': return fordModels
    case 'Chevrolet': return chevroletModels
    case 'BMW': return bmwModels
    case 'Mercedes': return mercedesModels
    case 'Audi': return audiModels
    default: return []
  }
}

// Mock valuation data
const mockValuation = {
  estimatedPrice: 24500,
  priceRange: [22000, 27000],
  breakdown: [
    { label: 'Base Market Value', value: 26000 },
    { label: 'Mileage Adjustment', value: -1000 },
    { label: 'Condition Adjustment', value: -500 },
  ]
}

export default function VehicleValueEstimator() {
    const [currentScreen, setCurrentScreen] = useState<'home' | 'analysis' | 'results'>('home')
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [mileage, setMileage] = useState('')
    const [condition, setCondition] = useState('')
    const [progress, setProgress] = useState(0)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
  
    const handleImageUpload = () => {
      // Simulate image upload and analysis
      setCurrentScreen('analysis')
      setIsAnalyzing(true)
      
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsAnalyzing(false)
            // Auto-populate with mock detected data
            setMake('Toyota')
            setModel('Camry')
            setYear('2020')
            setMileage('45000')
            setCondition('Good')
            return 100
          }
          return prev + 10
        })
      }, 300)
    }
  
    const handleManualSubmit = () => {
      if (make && model && year && mileage) {
        setCurrentScreen('results')
      }
    }
  
    const generateYears = () => {
      const currentYear = new Date().getFullYear()
      const years = []
      for (let i = currentYear; i >= 1980; i--) {
        years.push(i.toString())
      }
      return years
    }
  
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentScreen === 'home' && "Get Your Vehicle's Value"}
              {currentScreen === 'analysis' && "Analyzing Your Vehicle"}
              {currentScreen === 'results' && "Valuation Results"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {currentScreen === 'home' && "Upload a photo or enter details to get an instant valuation"}
              {currentScreen === 'analysis' && "We're analyzing your vehicle details"}
              {currentScreen === 'results' && "Here's your vehicle's estimated value"}
            </p>
          </header>

          {/* Main Content */}
        <main>
          {currentScreen === 'home' && (
            <div className="space-y-6">
              {/* Image Upload Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-center">Upload Vehicle Photo</CardTitle>
                  <CardDescription className="text-center">
                    Get the most accurate valuation by uploading a photo of your vehicle
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button 
                    onClick={handleImageUpload}
                    className="h-32 w-32 rounded-full flex flex-col items-center justify-center gap-2"
                    variant="outline"
                  >
                    <Upload className="h-8 w-8" />
                    <span>Upload</span>
                  </Button>
                </CardContent>
              </Card>

              {/* Divider */}
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
              </div>

              {/* Manual Entry Form */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-center">Enter Details Manually</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="make">Make</Label>
                      <Select onValueChange={setMake} value={make}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select make" />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicleMakes.map(make => (
                            <SelectItem key={make} value={make}>{make}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="model">Model</Label>
                      <Select onValueChange={setModel} value={model} disabled={!make}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          {getModelsForMake(make).map(model => (
                            <SelectItem key={model} value={model}>{model}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Select onValueChange={setYear} value={year}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {generateYears().map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="condition">Condition</Label>
                      <Select onValueChange={setCondition} value={condition}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input 
                      id="mileage" 
                      type="number" 
                      placeholder="Enter mileage" 
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center pt-4">
                    <Button 
                      onClick={handleManualSubmit}
                      disabled={!make || !model || !year || !mileage}
                      className="w-full md:w-auto"
                    >
                      Get Valuation <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

{currentScreen === 'results' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Valuation Results</CardTitle>
                <CardDescription className="text-center">
                  {make} {model} {year} • {mileage} miles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pb-6">
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400">Estimated Value</p>
                  <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    ${mockValuation.estimatedPrice.toLocaleString()}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Breakdown of your vehicle's valuation
                  </p>
                </div>

                <div className="space-y-4">
                  {mockValuation.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{item.label}</span>
                      <span className={item.value >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                        {item.value >= 0 ? '+' : ''}{item.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Market Range</span>
                    <span>${mockValuation.priceRange[0].toLocaleString()} - ${mockValuation.priceRange[1].toLocaleString()}</span>
                  </div>
                  <div className="relative h-4 bg-gray-300 dark:bg-gray-700 rounded-full">
                    <div 
                      className="absolute h-full bg-blue-500 rounded-full"
                      style={{
                        left: '0%',
                        width: '100%',
                        background: 'linear-gradient(to right, #ef4444, #f59e0b, #10b981)'
                      }}
                    ></div>
                    <div 
                      className="absolute top-0 h-6 w-0.5 bg-white dark:bg-gray-900"
                      style={{
                        left: `${((mockValuation.estimatedPrice - mockValuation.priceRange[0]) / 
                                (mockValuation.priceRange[1] - mockValuation.priceRange[0])) * 100}%`,
                        transform: 'translateX(-50%)'
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                  <Button onClick={() => setCurrentScreen('home')}>
                    Start New Valuation
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}